import os

from jinja2 import Template

projects_abspath = os.path.split(os.path.realpath(__file__))[0]
static_path = os.path.join(projects_abspath, "static")
template_from = os.path.join(static_path, "template", "basetemp.html")
authortemp_from = os.path.join(static_path, "template", "authortemp.html")

op_first_section = "\n---\n"
op_second_section = "\n----\n"
op_animate_section = "\n++++\n"
op_index_fragment = "\n--\n"
op_front_matter = "\n+++++\n"

# 文件信息
filename = str()
filepath = str()
output_foldname = "dist"
output_filename = "index.html"
output_foldpath = str()
output_filepath = str()
static_foldpath = str()
images_foldname = (
    "img"  # 如果要修改还要修炼static下的img文件名，template中icon的文件路径
)
images_foldpath = str()

content = str()  # MD内容

template: str | Template = str()  # HTML内容
title = str()
body = str()

# 作者信息相关
author_template: str | Template = str()


def Init(target_filepath):
    global filename, filepath, output_foldname, output_filename, output_foldpath, output_filepath, static_foldpath, images_foldpath
    filename = os.path.basename(target_filepath)
    filepath = os.path.abspath(target_filepath)
    output_foldpath = os.path.join(filepath.split(filename)[0], output_foldname)
    output_filepath = os.path.join(output_foldpath, output_filename)

    static_foldpath = os.path.join(output_foldpath, "static")
    images_foldpath = os.path.join(static_foldpath, images_foldname)
