import { arrayOf, string } from "prop-types";

import React, { Component, Fragment } from "react";

import TabelaOcorrencias from "./TabelaOcorrencias";
import InputFiltroPesquisa from "./InputFiltroPesquisa";

import Ocorrencia, {
  ocorrenciaShape
} from "../../../models/ocorrencia/Ocorrencia";

export default class PesquisaOcorrencias extends Component {
  static propTypes = {
    ocorrencias: arrayOf(ocorrenciaShape),
    filtroEstado: string
  };

  state = {
    filtro: ""
  };

  __filtrar(filtro) {
    this.setState({ filtro });
  }

  __ocorrenciasFiltradas() {
    const { ocorrencias, filtroEstado } = this.props;
    if (!ocorrencias) return null;
    return Ocorrencia.filtrarListaGenericamente(
      Ocorrencia.filtrarListaPorEstado(ocorrencias, filtroEstado),
      this.state.filtro
    );
  }

  __mostrarTabelaOcorrencias(ocorrencias, filtro) {
    if (ocorrencias && ocorrencias.length > 0) {
      return <TabelaOcorrencias ocorrencias={this.__ocorrenciasFiltradas()} />;
    } else if (ocorrencias && ocorrencias.length === 0) {
      let textoOcorrenciaVazia = "Nenhuma ocorrĂȘncia";
      if (filtro) {
        textoOcorrenciaVazia =
          "Nenhuma ocorrĂȘncia encontrada com o filtro informado";
      }
      return <h1 style={{ textAlign: "center" }}>{textoOcorrenciaVazia}</h1>;
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <Fragment>
        <InputFiltroPesquisa filtrar={this.__filtrar.bind(this)} />
        {this.__mostrarTabelaOcorrencias(
          this.__ocorrenciasFiltradas(),
          this.state.filtro
        )}
      </Fragment>
    );
  }
}
