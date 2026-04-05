package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GfgStatsResponse {
    private String username;
    private int totalSolved;
    private int easy;
    private int medium;
    private int hard;
}
