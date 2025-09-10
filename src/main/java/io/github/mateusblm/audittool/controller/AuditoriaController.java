package io.github.mateusblm.audittool.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.mateusblm.audittool.dto.AderenciaDTO;
import io.github.mateusblm.audittool.dto.ItemChecklistDTO;
import io.github.mateusblm.audittool.dto.NaoConformidadeDTO;
import io.github.mateusblm.audittool.model.ItemChecklistEntity;
import io.github.mateusblm.audittool.model.NaoConformidadeEntity;
import io.github.mateusblm.audittool.service.AuditoriaService;

@RestController
@RequestMapping("/api/auditoria")
public class AuditoriaController {

    @Autowired
    private AuditoriaService auditoriaService;

    @PostMapping("/checklist")
    public ResponseEntity<ItemChecklistEntity> criarItemChecklist(@RequestBody ItemChecklistDTO dto) {
        return ResponseEntity.ok(auditoriaService.criarItemChecklist(dto));
    }

    @GetMapping("/checklist")
    public ResponseEntity<List<ItemChecklistEntity>> obterTodosItensChecklist() {
        return ResponseEntity.ok(auditoriaService.obterTodosItensChecklist());
    }

    @PostMapping("/checklist/{itemChecklistId}/naoconformidade")
    public ResponseEntity<NaoConformidadeEntity> criarNaoConformidade(
            @PathVariable Long itemChecklistId,
            @RequestBody NaoConformidadeDTO dto) {
        try {
            return ResponseEntity.ok(auditoriaService.criarNaoConformidade(itemChecklistId, dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/naoconformidade")
    public ResponseEntity<List<NaoConformidadeDTO>> obterTodasNaoConformidades() {
        return ResponseEntity.ok(auditoriaService.obterTodasNaoConformidades());
    }

    @GetMapping("/aderencia")
    public ResponseEntity<AderenciaDTO> obterAderencia() {
        return ResponseEntity.ok(auditoriaService.calcularAderencia());
    }

    @PutMapping("/naoconformidade/{id}/resolver")
    public ResponseEntity<NaoConformidadeEntity> resolverNaoConformidade(@PathVariable Long id) {
        try {
            NaoConformidadeEntity ncResolvida = auditoriaService.resolverNaoConformidade(id);
            return ResponseEntity.ok(ncResolvida);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/naoconformidade/{id}/escalonar")
    public ResponseEntity<Void> escalonarNaoConformidade(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            auditoriaService.escalonarNaoConformidade(id, email);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
