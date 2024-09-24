"""create pipeline table

Revision ID: 609349b9d54d
Revises: 
Create Date: 2024-09-23 03:16:07.507502

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '609349b9d54d'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'pipeline',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('save', sa.Text, nullable=False),
    )


def downgrade() -> None:
    op.drop_table('pipeline')
