--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

-- Started on 2023-12-01 23:32:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 24722)
-- Name: cartela; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cartela (
    id_cartela character varying(60) NOT NULL,
    id_jogo character varying(60) NOT NULL,
    id_pessoa character varying(60) NOT NULL,
    premiada smallint NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    numeros numeric[] NOT NULL
);


ALTER TABLE public.cartela OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24745)
-- Name: jogo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jogo (
    id_jogo character varying(60) NOT NULL,
    id_sorteio character varying(60) NOT NULL,
    principal smallint NOT NULL,
    numeros_total integer NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    numeros_cartela integer,
    premiacao character varying(200),
    numeros_sorteados numeric[],
    id_pessoa character varying[]
);


ALTER TABLE public.jogo OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24704)
-- Name: pessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa (
    id_pessoa character varying(60) NOT NULL,
    id_usuario character varying(60) NOT NULL,
    nome character varying(20) NOT NULL,
    nome_completo character varying(90) NOT NULL,
    data_nascimento date NOT NULL,
    imagem_icone bytea,
    data_inclusao timestamp with time zone NOT NULL,
    data_inativacao timestamp with time zone,
    data_atualizacao timestamp with time zone,
    imagem_banner bytea
);


ALTER TABLE public.pessoa OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 24765)
-- Name: pessoa_chave_pix; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa_chave_pix (
    id_pessoa character varying(60) NOT NULL,
    chave character varying(50) NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    data_inativacao timestamp with time zone,
    tipo_chave numeric NOT NULL,
    data_atualizacao time with time zone
);


ALTER TABLE public.pessoa_chave_pix OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24717)
-- Name: pessoa_contato; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa_contato (
    id_contato character varying(60) NOT NULL,
    id_pessoa character varying(60) NOT NULL,
    tipo_contato integer NOT NULL,
    contato character varying(50) NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    data_inativacao timestamp with time zone,
    data_atualizacao timestamp with time zone
);


ALTER TABLE public.pessoa_contato OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24712)
-- Name: pessoa_endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa_endereco (
    id_endereco character varying(60) NOT NULL,
    id_pessoa character varying(60) NOT NULL,
    uf character varying(2) NOT NULL,
    cidade character varying(50) NOT NULL,
    bairro character varying(70) NOT NULL,
    logradouro character varying(90) NOT NULL,
    numero character varying(10) NOT NULL,
    complemento character varying(100),
    endereco_entrega smallint NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    data_inativacao timestamp with time zone,
    cep character varying(15) NOT NULL,
    ibge character varying(15) NOT NULL,
    data_atualizacao time with time zone
);


ALTER TABLE public.pessoa_endereco OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24731)
-- Name: sorteio; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sorteio (
    id_sorteio character varying(60) NOT NULL,
    titulo character varying(50) NOT NULL,
    data_sorteio timestamp with time zone NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    imagem_banner bytea,
    edicao numeric NOT NULL,
    valor numeric NOT NULL,
    limite_jogo_pessoa numeric NOT NULL,
    status numeric
);


ALTER TABLE public.sorteio OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24760)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id_usuario character varying(60) NOT NULL,
    email character varying(50) NOT NULL,
    senha character varying(60) NOT NULL,
    data_inclusao timestamp with time zone NOT NULL,
    data_inativacao date,
    data_atualizacao date,
    roles character varying(100)[]
);


ALTER TABLE public.usuario OWNER TO postgres;


ALTER TABLE ONLY public.cartela
    ADD CONSTRAINT cartela_pkey PRIMARY KEY (id_cartela);


--
-- TOC entry 4676 (class 2606 OID 41102)
-- Name: jogo jogo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo
    ADD CONSTRAINT jogo_pkey PRIMARY KEY (id_jogo);


--
-- TOC entry 4682 (class 2606 OID 41079)
-- Name: pessoa_chave_pix pessoa_chave_pix_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_chave_pix
    ADD CONSTRAINT pessoa_chave_pix_pkey PRIMARY KEY (id_pessoa, chave);


--
-- TOC entry 4667 (class 2606 OID 32832)
-- Name: pessoa_contato pessoa_contato_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_contato
    ADD CONSTRAINT pessoa_contato_pkey PRIMARY KEY (id_contato, id_pessoa);


--
-- TOC entry 4665 (class 2606 OID 41064)
-- Name: pessoa_endereco pessoa_endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_endereco
    ADD CONSTRAINT pessoa_endereco_pkey PRIMARY KEY (id_endereco, id_pessoa);


--
-- TOC entry 4663 (class 2606 OID 32783)
-- Name: pessoa pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (id_pessoa);


--
-- TOC entry 4673 (class 2606 OID 41123)
-- Name: sorteio sorteio_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sorteio
    ADD CONSTRAINT sorteio_pkey PRIMARY KEY (id_sorteio);


--
-- TOC entry 4678 (class 2606 OID 32769)
-- Name: usuario unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- TOC entry 4680 (class 2606 OID 32771)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 4668 (class 1259 OID 49340)
-- Name: cartela_id_jogo_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cartela_id_jogo_idx ON public.cartela USING btree (id_jogo);


--
-- TOC entry 4669 (class 1259 OID 49346)
-- Name: cartela_id_pessoa_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cartela_id_pessoa_idx ON public.cartela USING btree (id_pessoa);


--
-- TOC entry 4674 (class 1259 OID 41108)
-- Name: jogo_id_sorteio_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jogo_id_sorteio_idx ON public.jogo USING btree (id_sorteio);


--
-- TOC entry 4661 (class 1259 OID 32809)
-- Name: pessoa_id_usuario_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX pessoa_id_usuario_idx ON public.pessoa USING btree (id_usuario);


--
-- TOC entry 4686 (class 2606 OID 49341)
-- Name: cartela fk_cartela__id_jogo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartela
    ADD CONSTRAINT fk_cartela__id_jogo FOREIGN KEY (id_jogo) REFERENCES public.jogo(id_jogo);


--
-- TOC entry 4687 (class 2606 OID 49347)
-- Name: cartela fk_cartela__id_pessoa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cartela
    ADD CONSTRAINT fk_cartela__id_pessoa FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa);


--
-- TOC entry 4688 (class 2606 OID 41124)
-- Name: jogo fk_jogo__id_sorteio; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jogo
    ADD CONSTRAINT fk_jogo__id_sorteio FOREIGN KEY (id_sorteio) REFERENCES public.sorteio(id_sorteio);


--
-- TOC entry 4683 (class 2606 OID 32810)
-- Name: pessoa fk_pessoa__id_usuario; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fk_pessoa__id_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario);


--
-- TOC entry 4689 (class 2606 OID 41080)
-- Name: pessoa_chave_pix fk_pessoa_chave_pix__id_pessoa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_chave_pix
    ADD CONSTRAINT fk_pessoa_chave_pix__id_pessoa FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa);


--
-- TOC entry 4685 (class 2606 OID 32833)
-- Name: pessoa_contato fk_pessoa_contato__id_pessoa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_contato
    ADD CONSTRAINT fk_pessoa_contato__id_pessoa FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa);


--
-- TOC entry 4684 (class 2606 OID 41065)
-- Name: pessoa_endereco fk_pessoa_endereco__id_pessoa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa_endereco
    ADD CONSTRAINT fk_pessoa_endereco__id_pessoa FOREIGN KEY (id_pessoa) REFERENCES public.pessoa(id_pessoa);


-- Completed on 2023-12-01 23:32:40

--
-- PostgreSQL database dump complete
--

