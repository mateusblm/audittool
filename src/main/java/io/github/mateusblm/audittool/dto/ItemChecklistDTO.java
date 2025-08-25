package io.github.mateusblm.audittool.dto;

import io.github.mateusblm.audittool.model.ItemChecklistEntity;

public class ItemChecklistDTO {
    private String item;
    private ItemChecklistEntity.Status status;
    private String responsavel;
    private String classificacao;
    
    public String getItem() {
        return item;
    }
    public void setItem(String item) {
        this.item = item;
    }
    public ItemChecklistEntity.Status getStatus() {
        return status;
    }
    public void setStatus(ItemChecklistEntity.Status status) {
        this.status = status;
    }
    public String getResponsavel() {
        return responsavel;
    }
    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }
    public String getClassificacao() {
        return classificacao;
    }
    public void setClassificacao(String classificacao) {
        this.classificacao = classificacao;
    }

    
}
