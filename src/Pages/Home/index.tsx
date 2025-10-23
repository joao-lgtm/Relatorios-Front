import { useEffect, useState } from "react";
import { ThemeSwitcher } from "../../Components/ThemeSwitcher";
import { api } from "../../Services/api";

export function Home() {
  const [relatorios, setRelatorios] = useState([]);

  async function getRelatorios() {
    try {
      const response = await api.get("consultas/listar-relatorios/");
      setRelatorios(response.data.relatorios);
      
    } catch (error) {
      console.error("Erro ao buscar relatórios:", error);
    }
  }

  useEffect(() => {
    getRelatorios();
  }, []);

  console.log(relatorios)

  return (
    <>
      <div>
        <ThemeSwitcher />
      </div>

      <h1>Relatórios</h1>

      <ul>
        {relatorios.map((relatorio, index) => (
          <li key={index}>
            {JSON.stringify(relatorio)}
          </li>
        ))}
      </ul>
    </>
  );
}
