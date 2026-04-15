import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта на почту администратора"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    comment = body.get("comment", "").strip()

    if not name or not phone:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Имя и телефон обязательны"}),
        }

    smtp_host = "smtp.mail.ru"
    smtp_port = 465
    smtp_user = os.environ["EMAIL_TO"]
    smtp_password = os.environ["SMTP_PASSWORD"]
    email_to = os.environ["EMAIL_TO"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта — {name}"
    msg["From"] = smtp_user
    msg["To"] = email_to

    text = f"""Новая заявка с сайта:

Имя: {name}
Телефон: {phone}
Вопрос/пожелание: {comment or 'не указано'}
"""

    html = f"""
<div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #e0d4b0; border-radius: 8px;">
  <h2 style="color: #5c4a1e; margin-bottom: 20px;">Новая заявка с сайта</h2>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px 0; color: #888; width: 130px;">Имя</td><td style="padding: 8px 0; font-weight: bold;">{name}</td></tr>
    <tr><td style="padding: 8px 0; color: #888;">Телефон</td><td style="padding: 8px 0; font-weight: bold;">{phone}</td></tr>
    <tr><td style="padding: 8px 0; color: #888; vertical-align: top;">Вопрос</td><td style="padding: 8px 0;">{comment or 'не указано'}</td></tr>
  </table>
</div>
"""

    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, email_to, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
