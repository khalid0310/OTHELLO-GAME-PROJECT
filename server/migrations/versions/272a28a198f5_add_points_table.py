"""Add Points table

Revision ID: 272a28a198f5
Revises: 130404c24ade
Create Date: 2024-01-29 02:36:19.789613

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '272a28a198f5'
down_revision = '130404c24ade'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('points',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('player_point', sa.Integer(), nullable=False),
    sa.Column('cpu_point', sa.Integer(), nullable=False),
    sa.Column('win_or_lose', sa.String(length=10), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('move')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('move',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('move_number', sa.INTEGER(), nullable=False),
    sa.Column('move_description', sa.VARCHAR(length=255), nullable=False),
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('points')
    # ### end Alembic commands ###