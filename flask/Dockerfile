FROM python:latest

WORKDIR /app

ADD ./requirements.txt ./
RUN pip install -r ./requirements.txt

ADD . .

CMD ["uwsgi", "app.ini"]
