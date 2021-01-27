psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DATABASE_NAME" <<-EOSQL
  CREATE TABLE objects (
      id    SERIAL PRIMARY KEY,
      value TEXT
  );
EOSQL
