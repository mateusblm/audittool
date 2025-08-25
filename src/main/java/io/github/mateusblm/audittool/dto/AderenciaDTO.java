package io.github.mateusblm.audittool.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AderenciaDTO {
    private long totalItens;
    private long itensConformes;
    private long itensNaoSeAplica;
    private double percentualAderencia;
}
