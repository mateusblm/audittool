package io.github.mateusblm.audittool.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class NaoConformidadeDTO {
    private String descricao;
    private String classificacao;
    private LocalDate prazo;

    

}
