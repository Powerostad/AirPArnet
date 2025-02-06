FROM focker.ir/python:3.8

ENV TZ=Asia/Tehran
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir /app
WORKDIR /app

RUN apt update && \
    apt install -y default-mysql-client libmariadb-dev

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
