from os import getenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db = getenv("POSTGRES_DB")
password = getenv("POSTGRES_PASSWORD")
user = getenv("POSTGRES_USER")
url = f'postgresql://{user}:{password}@postgres/{db}'
engine = create_engine(url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()