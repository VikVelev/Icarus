FROM python:3 

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR . /code/
COPY . /code/
COPY requirements.txt /tmp
WORKDIR /tmp
RUN pip install -r requirements.txt
WORKDIR /code/