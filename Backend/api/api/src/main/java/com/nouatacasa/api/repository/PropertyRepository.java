package com.nouatacasa.api.repository;

import com.nouatacasa.api.model.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepository extends JpaRepository<Property, String>, JpaSpecificationExecutor<Property> {
    // Spring Data JPA va genera automat implementarea pentru metodele de bază (CRUD)
}
