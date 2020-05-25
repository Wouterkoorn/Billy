FROM python:latest

WORKDIR /app

ADD ./requirements.txt ./
RUN pip install -r ./requirements.txt

ADD . .

RUN chmod +x wait-for-it.sh

CMD ["./wait-for-it.sh", "mariadb:3306","--", "uwsgi", "app.ini"]
