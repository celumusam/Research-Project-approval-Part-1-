#!/usr/bin/env python3

import smtplib
import xlsxwriter
from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from application.models import database, weekly_stats
import datetime
import json
import os
from os import getenv

def user_list(main_workbook):
    """
    gets information of users from database

    Return: List of dictionaries
    """
    users = database.all('User')
    email_users = []
    for user in users.values():
        email_users.append(make_message(user, main_workbook))
    return email_users

def make_message(user, main_workbook):
    name = user.name.replace(' ' , '')
    workbook = xlsxwriter.Workbook(name + '.xlsx')

    # Create sheets for student's workbook and main_workbook (staff)
    worksheet = workbook.add_worksheet()
    main_worksheet = main_workbook.add_worksheet(name)

    date_range = weekly_stats.generate_week_range(datetime.date.today())
    dates = {'start_date': date_range[0], 'end_date': date_range[1]}
    applied_jobs = user.get_jobs_applied(**dates)
    applied_stats = user.get_jobs_applied_stats(datetime.date.today())
    three_week_total = applied_stats['three_week_total']
    # applied_jobs = database.userAppliedJobs(user.id)
    message = ['{} Weekly Report\n'.format(user.name)]
    message.append('Number Applied this Week: {}\n\n'.format(len(applied_jobs)))
    # TODO: Change these to be dynamic
    message.append('All Time Total: {}\n'.format(applied_stats['total_applications']))
    message.append('Avg Over {} Week(s): {}\n\n'.format(applied_stats['num_weeks'], applied_stats['avg_applications']))
    message.append('Total in Last 3 Weeks: {}\n'.format(three_week_total))
    message.append('Avg Over Last 3 Weeks: {:.2f}\n\n'.format(three_week_total / 3))

    main_worksheet.write('A1', 'STUDENT FIRST and LAST NAME')
    main_worksheet.write('A2', user.name)
    main_worksheet.write('B1', 'DATE')
    main_worksheet.write('B2', str(datetime.date.today()))
    main_worksheet.write('C1', 'COHORT')

    worksheet.write('A1', 'STUDENT FIRST and LAST NAME')
    main_worksheet.write('A2', user.name)
    worksheet.write('B1', 'DATE')
    main_worksheet.write('B2', str(datetime.date.today()))
    worksheet.write('C1', 'COHORT')

    main_worksheet.write('A4', 'Date of Application')
    main_worksheet.write('B4', 'Company Name')
    main_worksheet.write('C4', 'URL to Job Post')
    main_worksheet.write('D4', 'Job Title')
    main_worksheet.write('E4', 'Address')
    main_worksheet.write('F4', 'Additional Notes')
    main_worksheet.write('G4', 'Current Status')
    main_worksheet.write('H4', 'Interview Progress')
    worksheet.write('A4', 'Date of Application')
    worksheet.write('B4', 'Company Name')
    worksheet.write('C4', 'URL to Job Post')
    worksheet.write('D4', 'Job Title')
    worksheet.write('E4', 'Address')
    worksheet.write('F4', 'Additional Notes')
    worksheet.write('G4', 'Current Status')
    worksheet.write('H4', 'Interview Progress')

    for index, job in enumerate(applied_jobs):
        date = str(job.get('date_applied')).ljust(30)
        company = job.get('company').ljust(40)
        title = job.get('job_title').ljust(40)
        message.append(''.join([date, company, title, '\n']))
        # Add to Worksheet
        row = str(index + 5)
        worksheet.write('A' + row, str(job['date_applied']))
        worksheet.write('B' + row, job['company'])
        worksheet.write('C' + row, job['url'])
        worksheet.write('D' + row, job['job_title'])
        worksheet.write('E' + row, job['location'])
        worksheet.write('F' + row, job['notes'])
        worksheet.write('G' + row, job['status'])
        worksheet.write('H' + row, job['interview_progress'])

        main_worksheet.write('A' + row, job['date_applied'])
        main_worksheet.write('B' + row, job['company'])
        main_worksheet.write('C' + row, job['url'])
        main_worksheet.write('D' + row, job['job_title'])
        main_worksheet.write('E' + row, job['location'])
        main_worksheet.write('F' + row, job['notes'])
        main_worksheet.write('G' + row, job['status'])
        main_worksheet.write('H' + row, job['interview_progress'])

    workbook.close()

    return {
        'name' : user.name,
        'email' : user.email if user.email else 'jobodysseynotifications@gmail.com',
        # FOR TESTING PURPOSES
        #'email': 'jobodyssey19@gmail.com',
        'message' : ''.join(message),
        'excel': name + '.xlsx'
    }

def send_email(user_email, email_address, email_pwd, email_body, email_excel):
    msg = MIMEMultipart()

    message = email_body

    msg['From'] = email_address
    msg['To'] = user_email
    msg['Subject'] = 'Your Weekly Job Odyssey Report!'

    msg.attach(MIMEText(message, 'plain'))

    part = MIMEBase('application', 'octet-stream')
    part.set_payload(open(email_excel, 'rb').read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="' + email_excel + '"')
    msg.attach(part)

    with smtplib.SMTP_SSL(host='smtp.gmail.com', port=465) as s:
        s.login(email_address, email_pwd)
        s.send_message(msg)

    del msg
    os.remove(email_excel)

def main():
    email_address = getenv('JO_EMAIL')
    email_pwd = getenv('JO_EMAIL_PWD')

    # Sets up the workbook for Michelle and staff at Holberton School
    # Each sheet will contain the jobs summary page for each student
    main_workbook_name = 'StudentSummaries' + '.xlsx'
    main_workbook = xlsxwriter.Workbook(main_workbook_name)

    total_report = []

    users = user_list(main_workbook)
    for user in users:
        try:
            send_email(user['email'], email_address, email_pwd, user['message'], user['excel'])
        except e:
            pass
        total_report.append(user['message'])

    main_workbook.close()
    send_email('sf-students-hr@holbertonschool.com', email_address,
               email_pwd, '\n\n'.join(total_report), main_workbook_name)
    # FOR TESTING PURPOSES
    #send_email('jobodysseynotifications@gmail.com', email_address,
    #           email_pwd, '\n\n'.join(total_report), main_workbook_name)


if __name__ == '__main__':
    main()
