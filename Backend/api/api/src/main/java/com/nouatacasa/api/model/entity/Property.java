package com.nouatacasa.api.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "properties")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String location;

    private Integer rooms;

    private Double surface;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PropertyType type;

    private String imageUrl;
}
