package com.xiao.yi.file.enums;

import java.util.Arrays;

/**
 * @author xiaoyi
 */

public enum FileState {

    // 临时文件
    TEMP(0, "临时文件"),
    // 持久化文件
    PERSISTENCE(10, "持久化文件");

    /**
     * 序号
     */
    private int index;

    /**
     * 描述
     */
    private String text;

    FileState(int index, String text) {
        this.index = index;
        this.text = text;
    }

    public static FileState of(Integer index) {
        return Arrays.stream(values()).filter(v -> v.index == index).findFirst().orElseThrow(() -> {throw new RuntimeException("不存在该类型文件状态");});
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
