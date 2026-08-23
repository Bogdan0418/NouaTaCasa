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
}