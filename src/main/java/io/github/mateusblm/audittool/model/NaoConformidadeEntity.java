package io.github.mateusblm.audittool.model;

import lombok.Data;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Data
public class NaoConformidadeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "item_checklist_id", referencedColumnName = "id")
    private ItemChecklistEntity itemChecklistEntity;

    private String descricao;
    private String classificacao;
    private String responsavel;
    private LocalDate prazo;

    @Enumerated(EnumType.STRING)
    private StatusNC status;

    private LocalDate dataResolucao;

    public enum StatusNC {
        ABERTO, RESOLVIDO, ESCALONADO 
    }
    
}
