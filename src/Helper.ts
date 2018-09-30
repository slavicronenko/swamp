export const requestAnimationFrame = (<any>window).requestAnimationFrame
                                  || (<any>window).webkitRequestAnimationFrame
                                  || (<any>window).mozRequestAnimationFrame
                                  || (<any>window).msRequestAnimationFrame;
