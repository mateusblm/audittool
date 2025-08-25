package io.github.mateusblm.audittool.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.github.mateusblm.audittool.dto.AderenciaDTO;
import io.github.mateusblm.audittool.dto.ItemChecklistDTO;
import io.github.mateusblm.audittool.dto.NaoConformidadeDTO;
import io.github.mateusblm.audittool.model.ItemChecklistEntity;
import io.github.mateusblm.audittool.model.NaoConformidadeEntity;
import io.github.mateusblm.audittool.model.NaoConformidadeEntity.StatusNC;
import io.github.mateusblm.audittool.repository.ItemChecklistRepository;
import io.github.mateusblm.audittool.repository.NaoConformidadeRepository;

@Service
public class AuditoriaService {

    @Autowired
    private ItemChecklistRepository itemChecklistRepository;

    @Autowired
    private NaoConformidadeRepository naoConformidadeRepository;

    public ItemChecklistEntity criarItemChecklist(ItemChecklistDTO dto) {
        ItemChecklistEntity itemChecklist = new ItemChecklistEntity();
        itemChecklist.setItem(dto.getItem());
        itemChecklist.setStatus(dto.getStatus());
        itemChecklist.setResponsavel(dto.getResponsavel());
        itemChecklist.setClassificacao(dto.getClassificacao());
        return itemChecklistRepository.save(itemChecklist);
    }

    public NaoConformidadeEntity criarNaoConformidade(Long itemChecklistId, NaoConformidadeDTO dto) {
        ItemChecklistEntity itemChecklist = itemChecklistRepository.findById(itemChecklistId)
                .orElseThrow(() -> new RuntimeException("Item do Checklist não encontrado!"));

        if (itemChecklist.getStatus() != ItemChecklistEntity.Status.NAO) {
            throw new RuntimeException("Não conformidades só podem ser abertas para itens com status 'NAO'.");
        }

        NaoConformidadeEntity naoConformidade = new NaoConformidadeEntity();
        naoConformidade.setItemChecklistEntity(itemChecklist);
        naoConformidade.setDescricao(dto.getDescricao());
        naoConformidade.setClassificacao(dto.getClassificacao());
        naoConformidade.setPrazo(dto.getPrazo());
        naoConformidade.setResponsavel(itemChecklist.getResponsavel());
        naoConformidade.setStatus(NaoConformidadeEntity.StatusNC.ABERTO);

        return naoConformidadeRepository.save(naoConformidade);
    }

    public AderenciaDTO calcularAderencia() {
        long totalItens = itemChecklistRepository.count();
        long itensConformes = itemChecklistRepository.findAll().stream()
                .filter(item -> item.getStatus() == ItemChecklistEntity.Status.SIM).count();
        long itensNaoSeAplica = itemChecklistRepository.findAll().stream()
                .filter(item -> item.getStatus() == ItemChecklistEntity.Status.NAO_SE_APLICA).count();

        double percentualAderencia = 0;
        if (totalItens - itensNaoSeAplica > 0) {
            percentualAderencia = ((double) itensConformes / (totalItens - itensNaoSeAplica)) * 100;
        }

        return new AderenciaDTO(totalItens, itensConformes, itensNaoSeAplica, percentualAderencia);
    }

    public List<ItemChecklistEntity> obterTodosItensChecklist() {
        return itemChecklistRepository.findAll();
    }

    public List<NaoConformidadeEntity> obterTodasNaoConformidades() {
        return naoConformidadeRepository.findAll();
    }

        public NaoConformidadeEntity resolverNaoConformidade(Long naoConformidadeId) {
        NaoConformidadeEntity naoConformidade = naoConformidadeRepository.findById(naoConformidadeId)
                .orElseThrow(() -> new RuntimeException("Não conformidade não encontrada com o ID: " + naoConformidadeId));

        naoConformidade.setStatus(StatusNC.RESOLVIDO);
        naoConformidade.setDataResolucao(LocalDate.now()); 

        return naoConformidadeRepository.save(naoConformidade);
    }
}