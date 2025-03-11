FROM python:3.13

ENV POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry

WORKDIR /agent

RUN pip install poetry

COPY pyproject.toml poetry.lock README.md ./
COPY app ./app

RUN poetry install && rm -rf $POETRY_CACHE_DIR

CMD [ "poetry", "run", "python", "app/main.py", "start" ]
