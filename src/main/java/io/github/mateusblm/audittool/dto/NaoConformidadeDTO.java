package io.github.mateusblm.audittool.dto;

import io.github.mateusblm.audittool.model.NaoConformidadeEntity;
import lombok.Data;
import java.time.LocalDate;

@Data
public class NaoConformidadeDTO {

    private Long id;
    private String itemVerificado;
    private String descricao;
    private String classificacao;
    private String responsavel;
    private LocalDate prazo;
    private NaoConformidadeEntity.StatusNC status;
    private LocalDate dataResolucao;

    public NaoConformidadeDTO(NaoConformidadeEntity naoConformidade) {
        this.id = naoConformidade.getId();
        this.descricao = naoConformidade.getDescricao();
        this.classificacao = naoConformidade.getClassificacao();
        this.responsavel = naoConformidade.getResponsavel();
        this.prazo = naoConformidade.getPrazo();
        this.status = naoConformidade.getStatus();
        this.dataResolucao = naoConformidade.getDataResolucao();
        if (naoConformidade.getItemChecklistEntity() != null) {
            this.itemVerificado = naoConformidade.getItemChecklistEntity().getItem();
        } else {
            this.itemVerificado = "Item não encontrado";
        }
    }

    public NaoConformidadeDTO() {
    }


    
}