FROM ubuntu:18.04
ENV TZ=Asia/Manila
ENV DEBIAN_FRONTEND=noninteractive
RUN 	ln -fs /usr/share/zoneinfo/Asia/Manila /etc/localtime
RUN 	apt-get update -y && \
	apt-get upgrade -y && \
	apt-get dist-upgrade -y && \
	apt-get install software-properties-common npm nodejs curl wget nano -y
RUN 	apt-get purge apache2 apache* -y
RUN 	npm cache clean -f
RUN 	npm install -g npm
RUN 	npm install -g n
RUN 	n stable
RUN     npm install -g serve
COPY . /home/
RUN npm install --prefix /home
RUN npm run build --prefix /home/
CMD serve -s /home/build -l 8080