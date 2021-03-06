package com.ssafy.db.repository;

import com.ssafy.db.entity.CheckIn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {
    Optional<CheckIn> findById(Long id);
    Optional<CheckIn> findByCreatedDateAndUserId(LocalDate createdDate, Long userId);
    List<CheckIn> findAllByUserId(Long userId);

    @Query(value = "select * from check_in", nativeQuery = true)
    List<CheckIn> findCheckInList();
}
