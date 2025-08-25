package io.github.mateusblm.audittool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.mateusblm.audittool.model.ItemChecklistEntity;

@Repository
public interface ItemChecklistRepository extends JpaRepository<ItemChecklistEntity, Long> {
}
