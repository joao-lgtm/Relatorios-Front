import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";
import { api } from "../../Services/api";
import type { ApiResponse } from "../../types/api-helpers";
import { Container, Main, Table, TableBody, TableHead, Td, Th, Tr } from "./style";
import { Modal } from "../../Components/Modal";
import { useQuery } from "@tanstack/react-query";

type ListaConsultasResponse = ApiResponse<"/api/consultas/listar-relatorios/", "get">;
type ListaColunasResponse = ApiResponse<"/api/consultas/consultar-tipo-coluna/", "get">;
type ConsultarViewsResponse = ApiResponse<"/api/consultas/consultar/", "get">;

export function Home() {
  const [relatorio, setRelatorio] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [colunas, setColunas] = useState<ListaColunasResponse["data"]>([]);
  const [consulta, setConsulta] = useState<any[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectRelatorio = (value: string) => {
    setRelatorio(value);
    setConsulta([]);
    setIsModalOpen(true);
  };
  const { data: relatorios = [] } = useQuery<ListaConsultasResponse["data"], Error>({
    queryKey: ["relatorios"],
    queryFn: async () => {
      const response = await api.get<ListaConsultasResponse>("consultas/listar-relatorios/");
      return response.data.data;
    },
  });

  return (
    <Container>
      <div>
        <ThemeSwitcher />
      </div>

      <Main>
        <h1>Relatórios Move Mais</h1>
        <div>imagem meramente ilustrativa</div>

        <div>
          <select onChange={(e) => handleSelectRelatorio(e.target.value)}>
            <option value=""></option>
            {relatorios.map((r, index) => (
              <option key={index} value={r.nome}>
                {r.nome}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              if (relatorio) setIsModalOpen(true);
            }}
            disabled={!relatorio}
          >
            Alterar filtros
          </button>
        </div>
        <Table>
          <TableHead>
            <Tr>
              {consulta.length > 0 && colunas.map((coluna, index) => (
                <Th key={index}>{coluna.coluna}</Th>
              ))}
            </Tr>
          </TableHead>
          <TableBody>
            {consulta.length > 0 && consulta.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {colunas.map((col, colIndex) => (
                  <Td key={colIndex}>{row[col.coluna as keyof typeof row] ?? ""}</Td>
                ))}
              </Tr>
            ))}
          </TableBody>
        </Table>

        {isModalOpen && (
          <Modal
            relatorio={relatorio}
            colunas={colunas}
            setColunas={setColunas}
            setConsulta={setConsulta}
            closeModal={closeModal}
          />
        )}
      </Main>


    </Container>
  );
}
