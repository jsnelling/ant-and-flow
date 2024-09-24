from sqlalchemy import \
  Boolean, Column, ForeignKey, Integer, String, Text, \
  select

from sqlalchemy.orm import relationship

from .database import Base

class Pipeline(Base):
  __tablename__ = "pipeline"

  id = Column(Integer, primary_key=True)
  name = Column(String)
  save = Column(Text)

if __name__ == "__main__": 
  from .database import SessionLocal
  from pprint import pp

  with SessionLocal() as session:
    for user in session.query(Pipeline):
      print({ 
        "name": user.name, 
        "save": user.save, 
      })