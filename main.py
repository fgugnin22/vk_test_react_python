import subprocess, sys

from time import sleep
from datetime import datetime

while True:
    with open('report.txt', 'w') as f:
        f.write(datetime.now().strftime('%d.%m.%Y %H:%M:%S'))
    p = subprocess.Popen(["powershell.exe", "git add ."], stdout=sys.stdout)
    p.communicate()
    p = subprocess.Popen(["powershell.exe", "git commit -m \"aboba\""], stdout=sys.stdout)
    p.communicate()
    p = subprocess.Popen(["powershell.exe", "git push"], stdout=sys.stdout)
    p.communicate()
    sleep(1)
