
--
-- PostgreSQL database dump
--

\restrict qqUaQ7J8AaY8TKeEePae2pwOoJZ34rov8tDS8kNnDBNztNJ4mf2ZubfXZbMYbLQ

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-06-29 20:25:01

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16598)
-- Name: cuidados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cuidados (
    id_cuidado integer NOT NULL,
    imagen text,
    descripcion text
);


ALTER TABLE public.cuidados OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16681)
-- Name: planta_cuidado; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.planta_cuidado (
    id_planta integer NOT NULL,
    id_cuidado integer NOT NULL
);


ALTER TABLE public.planta_cuidado OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16631)
-- Name: plantas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plantas (
    id_planta integer NOT NULL,
    nombre character varying(100),
    tipoplanta character varying(50),
    tipoproducto character varying(50),
    imagen character varying(255),
    detalle1 character varying(255),
    detalle2 character varying(255)
);


ALTER TABLE public.plantas OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16630)
-- Name: plantas_id_planta_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plantas_id_planta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.plantas_id_planta_seq OWNER TO postgres;

--
-- TOC entry 5040 (class 0 OID 0)
-- Dependencies: 220
-- Name: plantas_id_planta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plantas_id_planta_seq OWNED BY public.plantas.id_planta;


--
-- TOC entry 223 (class 1259 OID 16671)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id_usuario integer NOT NULL,
    usuario character varying(50) NOT NULL,
    clave character varying(100) NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16670)
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.usuarios ALTER COLUMN id_usuario ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.usuarios_id_usuario_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 4869 (class 2604 OID 16634)
-- Name: plantas id_planta; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas ALTER COLUMN id_planta SET DEFAULT nextval('public.plantas_id_planta_seq'::regclass);


--
-- TOC entry 5029 (class 0 OID 16598)
-- Dependencies: 219
-- Data for Name: cuidados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cuidados (id_cuidado, imagen, descripcion) FROM stdin;
2	./public/recursos/imagenes/cuidados/cuidado2.png	Me gusta mucho el sol
3	./public/recursos/imagenes/cuidados/cuidado3.png	Me gusta mucho la sombra
4	./public/recursos/imagenes/cuidados/cuidado4.png	Voy adentro de la casa
5	./public/recursos/imagenes/cuidados/cuidado5.png	No me gusta el sol directo
6	./public/recursos/imagenes/cuidados/cuidado6.png	Regarme cada 15 días
7	./public/recursos/imagenes/cuidados/cuidado7.png	Me aguanto el frío
8	./public/recursos/imagenes/cuidados/cuidado8.png	Necesito que me corten las hojas
9	./public/recursos/imagenes/cuidados/cuidado9.png	Necesito un vaso de agua por semana
10	./public/recursos/imagenes/cuidados/cuidado10.png	No me gusta el frío
11	./public/recursos/imagenes/cuidados/cuidado11.png	Me gusta la tierra rica
12	./public/recursos/imagenes/cuidados/cuidado12.png	Soy de bajo mantenimiento
13	./public/recursos/imagenes/cuidados/cuidado13.png	Soy de estación primavera-verano
14	./public/recursos/imagenes/cuidados/cuidado14.png	Soy de estación invierno-otoño
1	./public/recursos/imagenes/cuidados/cuidado1.png	Necesito mucho riego durante la semana
15	/recursos/imagenes/cuidados/Suculentas.png	Soy una suculenta
16	/recursos/imagenes/cuidados/Cactuses.png	Soy un cactus
17	/recursos/imagenes/cuidados/Aromaticas.png	Soy una aromática
18	/recursos/imagenes/cuidados/Flores.png	Soy una flor
\.


--
-- TOC entry 5034 (class 0 OID 16681)
-- Dependencies: 224
-- Data for Name: planta_cuidado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.planta_cuidado (id_planta, id_cuidado) FROM stdin;
\.


--
-- TOC entry 5031 (class 0 OID 16631)
-- Dependencies: 221
-- Data for Name: plantas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plantas (id_planta, nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2) FROM stdin;
3	Cactus	Cactuses	Planta	/recursos/imagenes/plantas/Cactus1.jpeg	Planta para principiantes	Necesita mucho sol
4	Ciboulette	Aromáticas	Planta	/recursos/imagenes/plantas/Ciboulette.jpeg	Facil de mantener	Siempre viene bien tenerla para la cocina
5	Curry	Aromáticas	Planta	/recursos/imagenes/plantas/Curry.jpeg	Poco riego	Puede usarse para decorar
6	Romero	Aromáticas	Planta	/recursos/imagenes/plantas/Romero.jpeg	Necesita mucho sol	Siempre viene bien tenerla para la cocina
7	Flor rosa	Flores	Planta	/recursos/imagenes/plantas/Flor_rosa.jpeg	Regar una vez a la semana	Cuidar del sol directo
8	Geranio	Flores	Planta	/recursos/imagenes/plantas/Geranio.jpeg	Florece casi todo el año	Es bueno ir podando ramas secas
9	Lavanda	Aromáticas	Planta	/recursos/imagenes/plantas/Lavanda.jpeg	Es muy resistente	Crece rápido
10	Lazo de amor	Suculentas	Planta	/recursos/imagenes/plantas/Lazo_de_amor.jpeg	Ideal para macetas colgantes	Cuidarla del sol directo
11	Lengua de suegra	Suculentas	Planta	/recursos/imagenes/plantas/Lengua_de_suegra.jpeg	Planta para principiantes	Ideal para decorar la casa
12	Tomillo	Aromáticas	Planta	/recursos/imagenes/plantas/Tomillo.jpeg	Necesita muy poco riego	Siempre viene bien tenerla para la cocina
13	Oregano	Aromáticas	Planta	/recursos/imagenes/plantas/Oregano.jpeg	Necesita muy poco riego	Siempre viene bien tenerla para la cocina
14	Menta	Aromáticas	Planta	/recursos/imagenes/plantas/Menta.jpeg	Cuidarla del sol directo	Siempre viene bien tenerla para la cocina
15	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta7.jpeg	Planta para principiantes	No necesita tanto riego
16	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta1.jpeg	Planta para principiantes	No necesita tanto riego
17	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta2.jpeg	Planta para principiantes	No necesita tanto riego
18	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta3.jpeg	Planta para principiantes	No necesita tanto riego
19	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta4.jpeg	Planta para principiantes	No necesita tanto riego
20	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta5.jpeg	Planta para principiantes	No necesita tanto riego
21	Suculenta	Suculentas	Planta	/recursos/imagenes/plantas/Suculenta6.jpeg	Planta para principiantes	No necesita tanto riego
22	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Chica1.jpeg	\N	\N
23	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Mediana1.jpeg	\N	\N
24	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Mediana2.jpeg	\N	\N
25	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Mediana3.jpeg	\N	\N
26	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Mediana4.jpeg	\N	\N
27	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Grande1.jpeg	\N	\N
28	Maceta pintada a mano	\N	Maceta	/recursos/imagenes/plantas/Maceta_Grande2.jpeg	\N	\N
2	Albahaca	Aromáticas	Planta	\\recursos\\imagenes\\plantas\\Albahaca.jpeg	Mucho riego	Siempre viene bien tenerla para la cocina
29	Aloe vera	Suculentas	Planta	/recursos/imagenes/plantas/Aloe_Vera.jpeg	Crecimiento lento	Cuidar del frío
30	Planta Nueva	Aromáticas	Planta	/recursos/imagenes/plantas/PlantaNueva.png	Detalle nuevo 1	Detalle nuevo 2
\.


--
-- TOC entry 5033 (class 0 OID 16671)
-- Dependencies: 223
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id_usuario, usuario, clave) FROM stdin;
1	valeria	$2b$10$gIqTre0CgkAkprLg1mLiNeRdRW3p5WFL2fTI6AIrSdTCrm28sOZGC
2	mia	$2b$10$3NqicVffTchRrHUVxHh9xuwS/S6.khnatUhR7fnkuAbkG1pZ7rPP.
3	giane	$2b$10$Mbkm9eGcKNMUfUKXsirUgOWmYJbdn6uZfp.o.jfo65sjgwS6RWPjC
\.


--
-- TOC entry 5041 (class 0 OID 0)
-- Dependencies: 220
-- Name: plantas_id_planta_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.plantas_id_planta_seq', 30, true);


--
-- TOC entry 5042 (class 0 OID 0)
-- Dependencies: 222
-- Name: usuarios_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_usuario_seq', 3, true);


--
-- TOC entry 4871 (class 2606 OID 16605)
-- Name: cuidados cuidados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cuidados
    ADD CONSTRAINT cuidados_pkey PRIMARY KEY (id_cuidado);


--
-- TOC entry 4879 (class 2606 OID 16687)
-- Name: planta_cuidado planta_cuidado_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planta_cuidado
    ADD CONSTRAINT planta_cuidado_pkey PRIMARY KEY (id_planta, id_cuidado);


--
-- TOC entry 4873 (class 2606 OID 16639)
-- Name: plantas plantas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plantas
    ADD CONSTRAINT plantas_pkey PRIMARY KEY (id_planta);


--
-- TOC entry 4875 (class 2606 OID 16678)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4877 (class 2606 OID 16680)
-- Name: usuarios usuarios_usuario_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_usuario_key UNIQUE (usuario);


--
-- TOC entry 4880 (class 2606 OID 16693)
-- Name: planta_cuidado planta_cuidado_id_cuidado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planta_cuidado
    ADD CONSTRAINT planta_cuidado_id_cuidado_fkey FOREIGN KEY (id_cuidado) REFERENCES public.cuidados(id_cuidado) ON DELETE CASCADE;


--
-- TOC entry 4881 (class 2606 OID 16688)
-- Name: planta_cuidado planta_cuidado_id_planta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.planta_cuidado
    ADD CONSTRAINT planta_cuidado_id_planta_fkey FOREIGN KEY (id_planta) REFERENCES public.plantas(id_planta) ON DELETE CASCADE;


-- Completed on 2026-06-29 20:25:01

--
-- PostgreSQL database dump complete
--

\unrestrict qqUaQ7J8AaY8TKeEePae2pwOoJZ34rov8tDS8kNnDBNztNJ4mf2ZubfXZbMYbLQ

