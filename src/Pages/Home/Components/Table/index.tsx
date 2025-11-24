import { Ordenar } from "../../../../utils/orderby"; 
import * as S from "./style";
import { useState, useEffect } from "react";

type Coluna = {
    coluna: string;
    tipo: "string" | "number" | "boolean" | "date";
};

type Col = Record<string, unknown>;

type TableProps = {
    headersInfos: Coluna[];
    bodyInfo: Col[];
};

export function Table({ headersInfos, bodyInfo }: TableProps) {
    const [sortedData, setSortedData] = useState<Col[]>([]);
    const [sortConfig, setSortConfig] = useState<{
        key: string | null;
        direction: "asc" | "desc" | null;
    }>({ key: null, direction: null });
    const [originalData, setOriginalData] = useState<Col[]>([]);

    useEffect(() => {
        setOriginalData(bodyInfo);
        setSortedData(bodyInfo);
    }, [bodyInfo]);

    function handleOrderBy(column: string) {
        if (sortConfig.key !== column) {
            setSortConfig({ key: column, direction: "asc" });
            setSortedData(Ordenar(bodyInfo, column, "asc"));
        } else if (sortConfig.direction === "asc") {
            setSortConfig({ key: column, direction: "desc" });
            setSortedData(Ordenar(bodyInfo, column, "desc"));
        } else {
            setSortConfig({ key: null, direction: null });
            setSortedData(originalData);
        }
    }

    return (
        <S.TableContainer>
            <S.Table>
                <S.TableHead>
                    <S.Tr>
                        {headersInfos.map((header, index) => (
                            <S.Th
                                key={index}
                                onClick={() => handleOrderBy(header.coluna)}
                            >
                                {header.coluna}
                                {sortConfig.key === header.coluna && (sortConfig.direction === "asc" ? " 🔼" : sortConfig.direction === "desc" ? " 🔽" : "")}
                            </S.Th>
                        ))}
                    </S.Tr>
                </S.TableHead>

                <S.TableBody>
                    {sortedData.map((row, rowIndex) => (
                        <S.Tr key={rowIndex}>
                            {headersInfos.map((header, colIndex) => (
                                <S.Td key={colIndex}>
                                    {String(row[header.coluna] ?? "")}
                                </S.Td>
                            ))}
                        </S.Tr>
                    ))}
                </S.TableBody>
            </S.Table>
        </S.TableContainer>
    );
}
