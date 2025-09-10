package io.github.mateusblm.audittool.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemChecklistEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String item;

    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "itemChecklistEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<NaoConformidadeEntity> naoConformidades;

    private String responsavel;
    private String classificacao;

    public enum Status {
        SIM, NAO, NAO_SE_APLICA
    }
}
