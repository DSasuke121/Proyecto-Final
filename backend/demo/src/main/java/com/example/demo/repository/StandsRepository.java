package com.example.demo.repository;

import com.example.demo.Model.Stands;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StandsRepository extends JpaRepository<Stands, Long> {
}