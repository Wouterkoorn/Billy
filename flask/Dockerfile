FROM python:latest

WORKDIR /app

ADD ./requirements.txt ./
RUN pip install -r ./requirements.txt

ADD . .

RUN chmod +x wait-for-it.sh

CMD ["uwsgi", "app.ini"]
