from json import dumps, loads
from typing import Any, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .database import SessionLocal
from .models import Pipeline

router = APIRouter()

class PipelineDto(BaseModel):
    id: Optional[int]  = None
    name: str
    save: Any 

@router.get("/")
def list_pipelines():
    with SessionLocal() as session:
        return [ 
            { 
                "id": row.id,
                "name": row.name,
            } for row in session.query(Pipeline) 
        ]

@router.post("/")
def create_pipeline(pipeline_dto: PipelineDto):
    with SessionLocal() as session:
        model = dto_to_model(pipeline_dto)
        session.add(model)
        session.commit()
        return model_to_dto(model)

@router.get("/{item_id}")
def get_pipeline(item_id: int):
    with SessionLocal() as session:
        model = session.query(Pipeline).get(item_id)
        if model == None:
            raise HTTPException(status_code=404, detail="Item not found")
        return model_to_dto(model)

@router.put("/{item_id}") 
def update_pipeline(item_id: int, pipeline_dto: PipelineDto):
    with SessionLocal() as session:
        model = session.query(Pipeline).get(item_id)
        model.name = pipeline_dto.name
        model.save = dumps(pipeline_dto.save)
        session.commit()
        return model_to_dto(model)


def model_to_dto(model: Pipeline) -> PipelineDto:
    return PipelineDto(
        id = model.id,
        name = model.name,
        save = loads(model.save)
    )

def dto_to_model(dto: PipelineDto) -> Pipeline:
    return Pipeline(
        id = dto.id,
        name = dto.name,
        save = dumps(dto.save)
    )