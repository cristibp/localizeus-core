package com.localizeus.core.data.generators;

import java.util.*;

public class CSVReadyGenerator {
    public static void main(String[] args) {
        Map<Integer, String> mapFromIntToLanguage = new HashMap<>();
        mapFromIntToLanguage.put(1, "RO");
        mapFromIntToLanguage.put(2, "ES");
        mapFromIntToLanguage.put(3, "EN");
        mapFromIntToLanguage.put(4, "FR");

        List<Character> baseRandomGeneratedString = Arrays.asList('a', 's', 'f', 'k', 'b', 'h', 'i', 'p', 'o', 'j', 'k', 'l', 'e');
        int startId = 15;
        for (int i = 0; i < 4997; i++) {
            //id;value;translationKey_id;language_id
            //1;alabala;[1->4997];1-4
            Collections.shuffle(baseRandomGeneratedString);
            String randomized = "";
            StringBuilder sb = new StringBuilder();
            for (Character c : baseRandomGeneratedString) {
                sb.append(c);
            }
            randomized = sb.toString();
            int translationKey_id = i + 3;
            System.out.println((startId++)+";"+randomized + mapFromIntToLanguage.get(1) + ";" + translationKey_id + ";" + 1);
            System.out.println((startId++)+";"+randomized + mapFromIntToLanguage.get(2) + ";" + translationKey_id + ";" + 2);
            System.out.println((startId++)+";"+randomized + mapFromIntToLanguage.get(3) + ";" + translationKey_id + ";" + 3);
            System.out.println((startId++)+";"+randomized + mapFromIntToLanguage.get(4) + ";" + translationKey_id + ";" + 4);
        }
    }
}
