package com.ssafy.db.repository;

import com.ssafy.db.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    List<Inventory> findAllByUserId(Long userId);
    List<Inventory> findAllByUserIdAndWearTrue(Long userId);
    Optional<Inventory> findByItemAndUserId(String item, Long userId);
}
