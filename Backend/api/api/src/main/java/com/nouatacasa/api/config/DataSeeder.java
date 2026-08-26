package com.nouatacasa.api.config;

import com.nouatacasa.api.model.entity.Property;
import com.nouatacasa.api.model.entity.PropertyType;
import com.nouatacasa.api.repository.PropertyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(PropertyRepository repository) {
        return args -> {
            // Verificăm dacă baza de date este goală pentru a nu insera duplicate la fiecare restart
            if (repository.count() == 0) {

                Property p1 = Property.builder()
                        .title("Apartament de lux cu vedere panoramică")
                        .price(185000.0)
                        .location("București, zona Herăstrău")
                        .rooms(3)
                        .surface(95.0)
                        .type(PropertyType.APARTAMENT)
                        .imageUrl("https://images.unsplash.com/photo-1502672260266-1c1de2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")
                        .build();

                Property p2 = Property.builder()
                        .title("Casă modernă cu grădină spațioasă")
                        .price(240000.0)
                        .location("Ilfov, Pipera")
                        .rooms(4)
                        .surface(140.0)
                        .type(PropertyType.CASA)
                        .imageUrl("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")
                        .build();

                Property p3 = Property.builder()
                        .title("Studio luminos, ideal pentru investiție")
                        .price(65000.0)
                        .location("București, Tineretului")
                        .rooms(1)
                        .surface(38.0)
                        .type(PropertyType.APARTAMENT)
                        .imageUrl("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")
                        .build();

                // Salvăm toate proprietățile într-o singură tranzacție
                repository.saveAll(List.of(p1, p2, p3));

                System.out.println("✅ Baza de date a fost populată cu datele de test!");
            } else {
                System.out.println("ℹ️ Baza de date conține deja informații. Seeder-ul a fost ignorat.");
            }
        };
    }
}
