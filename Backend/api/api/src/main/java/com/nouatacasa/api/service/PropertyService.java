package com.nouatacasa.api.service;

import com.nouatacasa.api.model.entity.Property;
import com.nouatacasa.api.repository.PropertyRepository;
import com.nouatacasa.api.repository.specification.PropertySpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;

    public List<Property> searchProperties(String type, Integer rooms, Double maxPrice) {
        // Construim filtrele dinamice folosind clasa Specification creată anterior
        Specification<Property> spec = PropertySpecification.filterByCriteria(type, rooms, maxPrice);

        // Executăm query-ul în baza de date
        return propertyRepository.findAll(spec);
    }

    public java.util.Optional<Property> getPropertyById(String id) {
        return propertyRepository.findById(id);
    }
}
