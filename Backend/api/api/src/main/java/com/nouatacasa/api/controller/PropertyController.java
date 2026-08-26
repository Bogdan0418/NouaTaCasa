package com.nouatacasa.api.controller;

import com.nouatacasa.api.model.entity.Property;
import com.nouatacasa.api.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:3000") // Permitem frontend-ului să apeleze acest API
@RequiredArgsConstructor
public class PropertyController {

    private final PropertyService propertyService;

    @GetMapping("/search")
    public List<Property> searchProperties(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Integer rooms,
            @RequestParam(required = false) Double maxPrice) {

        return propertyService.searchProperties(type, rooms, maxPrice);
    }

    @GetMapping("/{id}")
    public org.springframework.http.ResponseEntity<Property> getPropertyById(@PathVariable String id) {
        return propertyService.getPropertyById(id)
                .map(property -> org.springframework.http.ResponseEntity.ok(property))
                .orElse(org.springframework.http.ResponseEntity.notFound().build());
    }

    @PostMapping
    public org.springframework.http.ResponseEntity<Property> createProperty(@RequestBody Property property) {
        Property savedProperty = propertyService.createProperty(property);

        // Returnăm codul 201 (CREATED) împreună cu proprietatea nou salvată (care are acum și ID generat)
        return org.springframework.http.ResponseEntity
                .status(org.springframework.http.HttpStatus.CREATED)
                .body(savedProperty);
    }
}