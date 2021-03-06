package com.ssafy.api.response.community;

import com.ssafy.db.entity.Community;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("CommunityResponse")
public class CommunityRes {
    @ApiModelProperty(name = "Community seq", example = "1")
    private Long id;

    @ApiModelProperty(name = "Community Title", example = "제목")
    private String title;

    @ApiModelProperty(name = "Community Content", example = "내용")
    private String content;

    @ApiModelProperty(name = "Community CreatedDate", example = "2022-05-03 12:05:12 110005")
    private LocalDateTime createdDate;

    @ApiModelProperty(name = "Community UpdatedDate", example = "2022-05-03 12:05:12 110005")
    private LocalDateTime updatedDate;

    @ApiModelProperty(name = "Community IsNotice", example = "true")
    private Boolean isNotice;

    @ApiModelProperty(name = "Community User seq", example = "1")
    private Long userId;

    @ApiModelProperty(name = "Community User Name", example = "김동유")
    private String name;

    @ApiModelProperty(name = "Community User Nickname", example = "떵유")
    private String nickname;

    public CommunityRes(Community entity) {
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.createdDate = entity.getCreatedDate();
        this.updatedDate = entity.getUpdateDate();
        this.isNotice = entity.getIsNotice();
        User user = entity.getUser();
        this.userId = user.getId();
        this.name = user.getName();
        this.nickname = user.getNickname();
    }
}
