FROM python:3.12

WORKDIR /app
COPY requirements.txt ./

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY src/ ./

EXPOSE 3001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "3001"]
