import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";
import { api } from "../../Services/api";
import type { ApiResponse } from "../../types/api-helpers";
import * as S from "./style";
import { Modal } from "./Components/Modal";
import { useQuery } from "@tanstack/react-query";
import { Table } from "./Components/Table";

type ListaConsultasResponse = ApiResponse<
  "/api/consultas/listar-relatorios/",
  "get"
>;
type ListaColunasResponse = ApiResponse<
  "/api/consultas/consultar-tipo-coluna/",
  "get"
>;
type ConsultarViewsResponse = ApiResponse<
  "/api/consultas/consultar/",
  "get"
>;

export function Home() {
  const [relatorio, setRelatorio] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colunas, setColunas] =
    useState<ListaColunasResponse["data"]>([]);
  const [consulta, setConsulta] = useState<any[]>([]);
  const [filtros, setFiltros] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({
    pagina: 1,
    tamanho: 50,
    total_paginas: 0,
    total_registros: 0,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectRelatorio = (value: string) => {
    setRelatorio(value);
    setConsulta([]);
    setPagination({
      pagina: 1,
      tamanho: 50,
      total_paginas: 0,
      total_registros: 0,
    });
    setIsModalOpen(true);
  };

  const { data: relatorios = [] } = useQuery<
    ListaConsultasResponse["data"],
    Error
  >({
    queryKey: ["relatorios"],
    queryFn: async () => {
      const response =
        await api.get<ListaConsultasResponse>(
          "consultas/listar-relatorios/",
        );
      return response.data.data;
    },
  });

  const { data: consultaResponse, refetch, isFetching } = useQuery<ConsultarViewsResponse["data"]>({
    queryKey: [
      "consulta-view",
      relatorio,
      JSON.stringify(filtros),
      pagination.pagina,
      pagination.tamanho,
    ],
    queryFn: async () => {
      const res = await api.get<ConsultarViewsResponse>("/consultas/consultar/", {
        params: {
          nome: relatorio,
          filtros: JSON.stringify(filtros),
          pagina: pagination.pagina,
          tamanho: pagination.tamanho,
        },
      });
      return res.data.data;
    },
    enabled: false,
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (consultaResponse) {
      setConsulta(consultaResponse.resultados);
      setPagination((prev) => ({
        ...prev,
        total_paginas: consultaResponse.total_paginas,
        total_registros: consultaResponse.total_registros,
      }));
    }
  }, [consultaResponse]);

  useEffect(() => {
    if (relatorio) {
      console.log("aqui")
      refetch();
    }
  }, [pagination.pagina, pagination.tamanho]);

  return (
    <S.Container>
      <div>
        <ThemeSwitcher />
      </div>

      <S.Main>
        <h1>Relatórios Move Mais</h1>

        <S.FilterContainer>
          <select
            onChange={(e) =>
              handleSelectRelatorio(e.target.value)
            }
          >
            <option value=""></option>
            {relatorios.map((r, index) => (
              <option key={index} value={r.nome}>
                {r.nome}
              </option>
            ))}
          </select>

          <button onClick={openModal} disabled={!relatorio}>
            Alterar filtros
          </button>
        </S.FilterContainer>

        <div
          style={{
            opacity: isFetching ? 0.4 : 1,
            filter: isFetching ? "blur(1px)" : "none",
          }}
        >
          <Table headersInfos={colunas} bodyInfo={consulta} />
        </div>

        {isFetching && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "14px",
              color: "#888",
            }}
          >
            Carregando página...
          </div>
        )}

        {consulta.length > 0 && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              disabled={pagination.pagina <= 1}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pagina: prev.pagina - 1,
                }))
              }
            >
              ← Anterior
            </button>

            <span>
              Página {pagination.pagina} de{" "}
              {pagination.total_paginas}
            </span>

            <button
              disabled={
                pagination.pagina >= pagination.total_paginas
              }
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  pagina: prev.pagina + 1,
                }))
              }
            >
              Próxima →
            </button>
          </div>
        )}

        {isModalOpen && (
          <Modal
            relatorio={relatorio}
            colunas={colunas}
            setColunas={setColunas}
            setConsulta={setConsulta}
            setPagination={setPagination}
            closeModal={closeModal}
            filtros={filtros}
            setFiltros={setFiltros}
          />
        )}
      </S.Main>
    </S.Container>
  );
}
