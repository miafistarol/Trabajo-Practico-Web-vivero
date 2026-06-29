
CREATE TABLE IF NOT EXISTS plantas
(
    id_planta     INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre        VARCHAR(100) NOT NULL,
    tipoplanta    VARCHAR(50),
    tipoproducto  VARCHAR(50),
    imagen        VARCHAR(255),
    detalle1      VARCHAR(255),
    detalle2      VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS cuidados
(
    id_cuidado   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    imagen       VARCHAR(255),
    descripcion  VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS planta_cuidado
(
    id_planta  INTEGER NOT NULL REFERENCES plantas(id_planta) ON DELETE CASCADE,
    id_cuidado INTEGER NOT NULL REFERENCES cuidados(id_cuidado) ON DELETE CASCADE,
    PRIMARY KEY (id_planta, id_cuidado)
);


CREATE TABLE IF NOT EXISTS usuarios
(
    id_usuario  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario     VARCHAR(50) UNIQUE NOT NULL,
    clave       VARCHAR(100) NOT NULL
);

