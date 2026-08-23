package com.nouatacasa.api.repository.specification;

import com.nouatacasa.api.model.entity.Property;
import com.nouatacasa.api.model.entity.PropertyType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

public class PropertySpecification {

    public static Specification<Property> filterByCriteria(String type, Integer rooms, Double maxPrice) {
        return Specification.where(hasType(type))
                .and(hasRooms(rooms))
                .and(priceLessThanOrEqual(maxPrice));
    }

    private static Specification<Property> hasType(String type) {
        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(type) || type.equalsIgnoreCase("toate")) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.equal(root.get("type"), PropertyType.valueOf(type.toUpperCase()));
        };
    }

    private static Specification<Property> hasRooms(Integer rooms) {
        return (root, query, criteriaBuilder) -> {
            if (rooms == null || rooms == 0) { // 0 înseamnă 'toate' din frontend
                return criteriaBuilder.conjunction();
            }
            if (rooms >= 4) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("rooms"), 4);
            }
            return criteriaBuilder.equal(root.get("rooms"), rooms);
        };
    }

    private static Specification<Property> priceLessThanOrEqual(Double maxPrice) {
        return (root, query, criteriaBuilder) -> {
            if (maxPrice == null) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }
}