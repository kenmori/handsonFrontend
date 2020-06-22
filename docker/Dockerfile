FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
    curl \
    nginx
RUN mkdir newdir
COPY ./text.txt /newdir/

CMD ["ls"]
