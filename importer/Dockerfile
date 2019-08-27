FROM grahama/pgfutter

WORKDIR /src

COPY entrypoint.sh .

RUN chmod +x /src/entrypoint.sh

ENTRYPOINT [ "/src/entrypoint.sh" ]